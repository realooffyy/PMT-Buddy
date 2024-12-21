# copilot my beloved

# ---------
# imports
# ---------

import shutil
import os
import json

# ---------
# functions
# ---------

def warning(text):
	print(f"\033[93m[!] {text}\033[0m".replace('\n', '\n    '))
def success(text):
	print(f"\033[92m[+] {text}\033[0m".replace('\n', '\n    '))
def error(text):
	print(f"\033[91m[-] {text}\033[0m".replace('\n', '\n    '))
	input()
def info(text):
	print(f"\033[94m[*] {text}\033[0m".replace('\n', '\n    '))

def userInput(text):
	return input(f"\033[96m[?] {text}\033[0m")

# ---------
# main
# ---------

build_folder = '../build/'
script_dir = os.path.dirname(os.path.abspath(__file__))
manifest_path = os.path.join(script_dir, '../public/manifest.json')
build_folder = os.path.join(script_dir, '../build/')
output_folder = os.path.join(script_dir, './output/')

# Delete build folder
if os.path.exists(build_folder):
	try:
		shutil.rmtree(build_folder)
		success(f"Successfully deleted {build_folder} folder")
	except Exception as e:
		error(f"Error deleting {build_folder} folder: {e}")
		os._exit(1)
else:
	warning(f"Build folder does not exist:\n{build_folder}\nPress enter to ignore and continue...")
	input()

# Change manifest.json version
try:
	with open(manifest_path, 'r') as manifest_file:
		manifest_data = json.load(manifest_file)
		current_version = manifest_data.get('version', 'No version found')
		info(f"Current manifest version: {current_version}")
		new_version = userInput("Enter new version: ")
		manifest_data['version'] = new_version

	with open(manifest_path, 'w') as manifest_file:
		json.dump(manifest_data, manifest_file, indent=4)
		success(f"Updated manifest version to {new_version}")
except Exception as e:
	error(f"Error updating manifest version: {e}")
	os._exit(1)

# Prettier
try:
	prettier_result = os.system('npx prettier -w --config ../.prettierrc ../')
	if prettier_result != 0:
		raise Exception(f"Prettier failed with exit code {prettier_result}")
	success("Successfully prettified files")
except Exception as e:
	error(f"Error running prettier: {e}")
	os._exit(1)

# Run npm build command
try:
	npm_result = os.system('npm run build')
	if npm_result != 0:
		raise Exception(f"npm build failed with exit code {npm_result}")
	success("Successfully ran npm build")
except Exception as e:
	error(f"Error running npm build: {e}")
	os._exit(1)

# Delete current zip file
if os.path.exists(os.path.join(output_folder, 'PMT-Buddy.zip')):
	try:
		os.remove(os.path.join(output_folder, 'PMT-Buddy.zip'))
		success("Successfully deleted current zip file")
	except Exception as e:
		error(f"Error deleting current zip file: {e}")
		os._exit(1)

# Zip build folder
try:
	shutil.make_archive(os.path.join(output_folder, 'PMT-Buddy'), 'zip', build_folder)
	success("Successfully zipped build folder")

	# Open the output folder
	try:
		if os.name == 'nt':  # windows
			os.startfile(output_folder)
		elif os.name == 'posix':  # macos and linux
			os.system(f'open "{output_folder}"' if sys.platform == 'darwin' else f'xdg-open "{output_folder}"')
		success(f"Successfully opened {output_folder}")
	except Exception as e:
		error(f"Error opening output folder: {e}")
		os._exit(1)

except Exception as e:
	error(f"Error zipping build folder: {e}")
	os._exit(1)

print("\n")
success("All done!")
input()