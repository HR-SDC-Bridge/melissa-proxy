module.exports = (title, body, scripts) =>
  `<!DOCTYPE html >
    <html>
      <head>
        <title>${title}</title>
        <link rel="icon" href="#">
          <link rel="stylesheet" type="text/css" href="styles/main.css">
      </head>
      <body>
        ${body}
        <div id="static"></div>
      </body>
      ${scripts}
  </html>`;
