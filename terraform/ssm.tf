# SSM Parameter Store
resource "aws_ssm_parameter" "api_key" {
  name  = var.api_key_name
  type  = "SecureString"
  value = var.api_key_value
}
