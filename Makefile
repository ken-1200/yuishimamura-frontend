AWS_PROFILE := machidahouse-lab.admin
TF_REMOVE := rm -rf .terraform/
TF_INIT := terraform init
TF_PLAN := terraform plan -var-file=variable.tfvars
TF_APPLY := terraform apply -auto-approve -var-file=variable.tfvars

-include .env

.PHONY: tf-fmt
tf-fmt:
	terraform fmt -recursive

.PHONY: plan
plan:
	${TF_REMOVE}
	${TF_INIT}
	${TF_PLAN}

.PHONY: plan-wp
plan-wp:
	${TF_REMOVE}
	AWS_PROFILE=${AWS_PROFILE} ${TF_INIT}
	AWS_PROFILE=${AWS_PROFILE} ${TF_PLAN}

.PHONY: apply
apply:
	${TF_REMOVE}
	${TF_INIT}
	${TF_APPLY}

.PHONY: apply-wp
apply-wp:
	${TF_REMOVE}
	AWS_PROFILE=${AWS_PROFILE} ${TF_INIT}
	AWS_PROFILE=${AWS_PROFILE} ${TF_APPLY}

.PHONY: deploy-s3
deploy-s3:
	aws s3 sync dist/ ${DEPLOY_BUCKET} --delete --profile ${AWS_PROFILE}

.PHONY: deploy-cf
deploy-cf:
	aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*" --region ap-northeast-1 --profile ${AWS_PROFILE}