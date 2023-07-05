provider "aws" {
  region = "ap-northeast-1"
  default_tags {
    tags = {
      Product    = "machidahouse-lab."
      Service    = "yuishimamura-front"
      Env        = var.env_prefix
      Created    = "terraform"
      Repository = "yuishimamura-front"
      Billing    = "yuishimamura-front"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  alias  = "use1"
  default_tags {
    tags = {
      Product    = "machidahouse-lab."
      Service    = "yuishimamura-front"
      Env        = var.env_prefix
      Created    = "terraform"
      Repository = "yuishimamura-front"
      Billing    = "yuishimamura-front"
    }
  }
}