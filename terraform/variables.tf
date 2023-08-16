variable "aws_region" {
  default = "ap-northeast-1"
}

variable "env_prefix" {}

variable "aws_profile" {}

variable "main_domain" {}

variable "zone_id" {}

variable "gsc_value" {}

variable "api_key_name" {}

variable "api_key_value" {}

locals {
  s3_bucket_name  = "${var.env_prefix}-yuishimamura-website-bucket-cf"
}