locals {
  function_spa_name          = "${var.env_prefix}-spa"
  function_spa_qualified_arn = resource.aws_cloudfront_function.cloudfront_function_spa.arn
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Yui Shimamura website CloudFront distribution."
  default_root_object = "index.html"
  aliases             = ["${var.main_domain}"]
  origin {
    domain_name = "${aws_s3_bucket.bucket.bucket_domain_name}"
    origin_id   = "${aws_s3_bucket.bucket.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }
  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.certificate.arn
    ssl_support_method  = "sni-only"
  }
  default_cache_behavior {
    allowed_methods  = ["HEAD", "GET"]
    cached_methods   = ["HEAD", "GET"]
    target_origin_id = "${aws_s3_bucket.bucket.id}"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    function_association {
      event_type   = "viewer-request"
      function_arn = local.function_spa_qualified_arn
    }
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }
  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }
  depends_on = [aws_acm_certificate.certificate]
}

# Origin Access Control (OAC)
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "${local.s3_bucket_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Cloudfront Function for SPA
resource "aws_cloudfront_function" "cloudfront_function_spa" {
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_function
  name    = local.function_spa_name
  runtime = "cloudfront-js-1.0"
  code    = file("./src/func_spa.js")
}
