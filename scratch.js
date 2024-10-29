function setupClosure () {
  const x = 2;
  return function runClosure(y) {
    console.log(x * y)
  }
}

setupClosure()(4)
// 8


button.addEventlistener((e) => {
  const { multiplier } = e.target.dataset;

  const cells = document.querySelectorAll('.output-cell')
  cells.forEach((cellNode, idx)=> {
    cellNode.textContent = multiplier * (idx + 1);
  });
});