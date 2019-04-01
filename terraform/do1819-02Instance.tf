resource "aws_instance" "web" {
  ami           = "ami-09ead922c1dad67e4"
  instance_type = "t2.micro"
  vpc_security_group_ids = ["${aws_security_group.ssh_http.id}" ]
  key_name = "bluecloudus"
  tags {
    Name = "ACME-Explorer"
  }
  provisioner "remote-exec" {
   inline = [ 
	#"sudo yum update -y",
	"sudo yum install -y docker",
	"sudo service docker start",
	"sudo groupadd docker",
	"sudo usermod -a -G docker $USER",
	"sudo curl -L https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose",
	"sudo chmod +x /usr/local/bin/docker-compose",
	"sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose",
	"sudo yum install git -y",
	"git clone https://github.com/MIS-DO/DO1819-02.git", 
	"cd DO1819-02", 
	"sudo bash setup.sh", 
	]
  } 

  connection {
    type     = "ssh"
    user     = "ec2-user"
    password = ""
    private_key = "${file("~/tareadocker/llaves/bluecloudus.pem")}"
  }
}