while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployService.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying $service to $hostname with $key\n"

# Save the original directory
orig_dir=$(pwd)

# Change to the backend directory and perform operations
cd ../full-page-backend

# Step 1
printf "\n----> Build the distribution package\n"
rm -rf dist
mkdir dist
cp -r public dist
cp *.js dist
cp *.json dist

# Step 2
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}
mkdir -p services/${service}
ENDSSH

# Change to the backend directory again before copying the distribution package
cd ../full-page-backend

# Step 3
printf "\n----> Copy the distribution package to the target\n"
scp -r -i "$key" dist/* ubuntu@$hostname:services/$service

# Step 4
printf "\n----> Deploy the service on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
bash -i
cd services/${service}
npm install
pm2 restart ${service}
ENDSSH

# Change back to the original directory
cd "$orig_dir"

# Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf dist