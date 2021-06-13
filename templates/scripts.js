module.exports = (items) => `
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

${items.map(item => {
  return `<script src ="/services/${item}.js"></script>`;
}).join('\n')}

<script>
${items.map(item => `
  ReactDOM.hydrate(
    React.createElement(${item}),
    document.getElementById('${item}')
  );`)}
</script>
`;