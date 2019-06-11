# Business College Helsinki - WordPress Summer Project Environment

The project template for the WordPress summer course project with Heroku deployment and local Docker development.

Based on the [WP Heroku Docker Project](https://github.com/anttiviljami/wordpress-heroku-docker-project) by Viljami Kuosmanen.

## Features

- [x] Bedrock-like modern development environment
- [x] Local Heroku-like environment with Docker-compose
- [x] WP-CLI
- [x] Configurable Nginx
- [x] Travis CI pipeline you can run with Docker
- [x] PHP Codesniffer with nicer coding standards for WordPress
- [x] Terraform deployment for full WordPress stack provisioning to Heroku & AWS
- [x] Heroku PHP7 & Node 8 application runtime
- [x] Heroku Redis Cache
- [x] AWS S3 for media uploads
- [x] AWS RDS for MariaDB
- [x] Papertrail log management
- [x] NPM scripts for ease of use
- [x] Theme template with Foundation 6
- [x] Webpack asset building

## Installation

Clone this repo and source set up your environment inside the project root.

```bash
cp .env.sample .env
source .env
```

You need to run this just once inside the project directory. Autoenv will take care of sourcing the .env file after this.

Install Composer and NPM packages:

```bash
make init
```

Outside the docker shell, you can now start the main process

```bash
make docker-start
```

You can now navigate to [`http://localhost:8080`](http://localhost:8080) to
start working with your local WordPress installation.

## Development

To start developing the project in a local environment you need to first start the Docker for Windows and then run the docker environment inside the project folder. After it you should start the Webpack watch process.

```bash
# Start the Docker
make docker-start
# To exit from the logs type CTRL + C.
# Start watching for changes in SCSS and JS files.
make watch
```

## Use Makefile

When developing, you can use [Makefile](https://en.wikipedia.org/wiki/Make_(software)) for doing the following operations :

| Name          | Description                                  |
|---------------|----------------------------------------------|
| init          | Install Composre packages including WP       |
| composer-up   | Update PHP dependencies with Composer        |
| docker-start  | Create and start containers                  |
| docker-stop   | Stop and clear all services                  |
| logs          | Follow log output                            |
| rm-containers | Stop and remove all containers.              |
| shell         | Open a shell inside web container.           |
| watch         | Start the asset compilation watch process    |
| build         | Create production versions of assets.        |

## WP-CLI

You can run WP-CLI locally by starting the shell container. A list of basic commands can be found [here](https://developer.wordpress.org/cli/commands/). To start a shell container run:

```bash
make shell
```

To test the WP-CLI run:

```bash
wp db check
```

You should see an output of all the database tables created by WordPress.

## Deploying with Terraform

Install [AWS-CLI](https://aws.amazon.com/cli/)

Install [Heroku-CLI](https://devcenter.heroku.com/articles/heroku-cli)

To deploy using Terraform, make sure you've prepared Heroku and AWS credentials,
and you've installed the [Terraform CLI binary](https://www.terraform.io/downloads.html)
on your system.

You can get your Heroku API key from the Heroku dashboard
```
export HEROKU_API_KEY=
export HEROKU_EMAIL=
```

For AWS, create an IAM user with Administrator rights
```
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
```

The state of Terraform is managed in S3, so it should automatically sync any
changes from the remote backend. For this you'll need to manually set up an S3
bucket in the eu-west-1 region with the name `wp-terraform-backend`

```
terraform init
terraform apply
```

After this you can push to your newly created Heroku app's git URL to trigger
a Heroku deployment.

```
git remote add dev https://git.heroku.com/[my-project-name]-dev.git
git push dev
```

### WP-CLI in Heroku

To run wp-cli in a Heroku instance, just run a temporary dyno.

```bash
heroku run bash
```

Both environments have WP-CLI available as `wp`.
