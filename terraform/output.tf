output "instance_public_ip" {
	value = "sudo ssh -i 'bluecloudus.pem' ec2-user@${aws_instance.web.public_ip}"
}