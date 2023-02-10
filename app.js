const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '1061957378546-53fchl2me1ottbnltr2kjisltgffmmd0.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04MrvZx--JH5yCgYIARAAGAQSNwF-L9IrJNjc_x4Yo-4m5gBfyL3fzAMVrUYfy8T3_brzG5F9k9Ry8QYK0z9Ms5ZpdMitbe-pYi8';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });

  const filePath = path.join(__dirname, 'Eazydiner.png');

  async function uploadFile() {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: 'Eazydiner.jpg', //This can be name of your choice
          mimeType: 'image/png',
        },
        media: {
          mimeType: 'image/png',
          body: fs.createReadStream(filePath),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }


  async function deleteFile() {
    try {
      const response = await drive.files.delete({
        fileId: 'YOUR FILE ID',
      });
      console.log(response.data, response.status);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function generatePublicUrl() {
    try {
      const fileId = '1-1PwS91UlAM269meQD15dg9A_Ljt4sl8';
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
  
      /* 
      webViewLink: View the file in browser
      webContentLink: Direct download link 
      */
      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  generatePublicUrl();
