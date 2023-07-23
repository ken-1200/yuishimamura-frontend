###################################################
## main domain用(yuishimamura.com) Certificate
###################################################
# ACM Certificate
resource "aws_acm_certificate" "certificate" {
  domain_name       = "${var.main_domain}"
  validation_method = "DNS"
  provider          = aws.use1
  lifecycle {
    create_before_destroy = true
  }
}

# DNS Validation Record
resource "aws_route53_record" "certificate_validation" {
  for_each = {
    for dvo in aws_acm_certificate.certificate.domain_validation_options: dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  type            = each.value.type
  zone_id         = "${var.zone_id}"
  ttl             = 60
}

# Wait for ACM validation
resource "aws_acm_certificate_validation" "certificate_validation" {
  certificate_arn         = "${aws_acm_certificate.certificate.arn}"
  validation_record_fqdns = [for record in aws_route53_record.certificate_validation: record.fqdn]
  provider                = aws.use1
}

# Create alias in CloudFront distribution
resource "aws_route53_record" "www" {
  zone_id = "${var.zone_id}"
  name    = "${var.main_domain}"
  type    = "A"
  alias {
    name                   = replace(aws_cloudfront_distribution.distribution.domain_name, "/[.]$/", "")
    zone_id                = "${aws_cloudfront_distribution.distribution.hosted_zone_id}"
    evaluate_target_health = true
  }
  depends_on = [aws_cloudfront_distribution.distribution]
}
# ↑aws_cloudfront_distribution リソースで作成されたCloudFront Distribution に www.main_domain のエイリアスを作成しています。aliasブロックを使用することで、AレコードにCNAMEの振る舞いを追加し、CloudFrontのエンドポイントに直接アクセスすることができます。


###################################################
## main domain(API)用 Certificate
###################################################

resource "aws_acm_certificate" "main-domain-api-cert" {
  domain_name       = "api.${var.main_domain}"
  validation_method = "DNS"
}

resource "aws_route53_record" "main-domain-api-cert-validation" {
  for_each = { for el in aws_acm_certificate.main-domain-api-cert.domain_validation_options : el.domain_name => el }

  zone_id  = "${var.zone_id}"

  name     = each.value.resource_record_name
  type     = each.value.resource_record_type
  records  = [each.value.resource_record_value]
  ttl      = 60
}

resource "aws_acm_certificate_validation" "main-domain-api-cert" {
  certificate_arn         = aws_acm_certificate.main-domain-api-cert.arn
  validation_record_fqdns = [for record in aws_route53_record.main-domain-api-cert-validation: record.fqdn]
}
