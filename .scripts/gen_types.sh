# source env variables and extract the project url into a temporary variable
source .env
PROJECT_URL=$SUPABASE_URL
# get the project id from the project url
# https://abcd1234.supabase.co -> abcd1234
PROJECT_ID=${PROJECT_URL#*//} # remove protocol
PROJECT_ID=${PROJECT_ID%.*.*} # remove domain

echo Using PROJECT_ID: $PROJECT_ID

if [ -z "$PROJECT_ID" ]
then
	echo "Error: Project ID not found"
	exit 1
fi

npx --yes supabase gen types typescript --project-id $PROJECT_ID > app/database.ts

echo "Generated typescript types in app/database.ts"