<div className="App">
  {buttonsArray.map((el) => (
    <button key={el} value={el} className="bg-purple" onClick={inputNum}>
      {" "}
      {el}
    </button>
  ))}
  <div>
    {ops.map((el) => (
      <button value={el} onClick={handleOperator}>
        {el}
      </button>
    ))}
    <button value="=" onClick={calculate}>
      {" "}
      =
    </button>
  </div>
  <div></div>

  {cur ? (
    <div>
      {" "}
      {cur}
      {operator}{" "}
    </div>
  ) : (
    <div>
      {" "}
      {prev}
      {operator}{" "}
    </div>
  )}
</div>;