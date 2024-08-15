/* eslint-disable no-undef */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Adjust the paths to be relative to the project root
const projectRoot = path.resolve(__dirname, '..');
const easJsonPath = path.join(projectRoot, 'eas.json');
const gitignorePath = path.join(projectRoot, '.gitignore');

// Function to update eas.json
function updateEasJson() {
  if (fs.existsSync(easJsonPath)) {
    const easJson = JSON.parse(fs.readFileSync(easJsonPath, 'utf8'));

    if (
      easJson.submit &&
      easJson.submit.production &&
      easJson.submit.production.ios
    ) {
      delete easJson.submit.production.ios.appleId;
      delete easJson.submit.production.ios.ascAppId;
      delete easJson.submit.production.ios.appleTeamId;
    }

    fs.writeFileSync(easJsonPath, JSON.stringify(easJson, null, 2));
    console.log('eas.json updated successfully.');
  } else {
    console.log('eas.json file not found.');
  }
}

// Function to update .gitignore
function updateGitignore() {
  if (fs.existsSync(gitignorePath)) {
    let gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    const patterns = ['GoogleService-info.plist', 'google-services.json'];

    patterns.forEach((pattern) => {
      const regex = new RegExp(`#?\\s*${pattern}`, 'g');
      if (!gitignoreContent.match(regex)) {
        gitignoreContent += `\n${pattern}`;
      } else {
        gitignoreContent = gitignoreContent.replace(regex, `\n${pattern}`);
      }
    });

    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log('.gitignore updated successfully.');
  } else {
    console.log('.gitignore file not found.');
  }
}

// Function to unstage files if they are in .gitignore
function unstageIgnoredFiles() {
  const filesToUnstage = ['GoogleService-Info.plist', 'google-services.json'];

  filesToUnstage.forEach((file) => {
    try {
      // Check if the file is staged for commit
      const isStaged = execSync(`git diff --cached --name-only`)
        .toString()
        .includes(file);

      // If the file is staged, unstage it
      if (isStaged) {
        execSync(`git reset HEAD ${file}`);
        console.log(`${file} was unstaged as it is now in .gitignore.`);
      }
    } catch (err) {
      console.error(`Error unstaging ${file}:`, err.message);
    }
  });
}

// Run the functions
updateEasJson();
updateGitignore();
unstageIgnoredFiles();

// Automatically stage the updated .gitignore and eas.json
execSync('git add eas.json .gitignore');
