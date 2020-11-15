import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";

import "./Sets.css";

type PropsType = {
  sets: string[][];
  setSets: (sets: string[][]) => void;
};

const MAX_SETS = 5;

const Sets = (props: PropsType) => {
  const [setValues, setSetValues] = useState<string[]>([""]);
  const setLabels = ["A", "B", "C", "D", "E"];

  const onChangeSet = (event: ChangeEvent<HTMLInputElement>) => {
    const setsClone = [...setValues];
    const { index } = event.target.dataset;
    const { value } = event.target;

    if (index) {
      setsClone[+index] = value;
      setSetValues(setsClone);
    }
  };

  const addSet = () => {
    const setsClone = [...setValues];
    setsClone.push("");
    setSetValues(setsClone);
  };

  const removeSet = (event: MouseEvent<HTMLButtonElement>) => {
    const setsClone = [...setValues];
    const target = event.target as HTMLButtonElement;
    const { index } = target.dataset;

    if (index) {
      setsClone.splice(+index, 1);
      setSetValues(setsClone);
    }
  };

  const setElements = setValues.map((set, index) => (
    <div className="Sets-set" key={index}>
      <label>
        <span>Conjunto {setLabels[index]}:</span>
        <input
          type="text"
          value={set}
          data-index={index}
          onChange={onChangeSet}
        />{" "}
        {setValues.length > 1 ? (
          <button data-index={index} onClick={removeSet}>
            Remover
          </button>
        ) : null}
        <span>Cardinalidade: {props.sets[index]?.length}</span>
      </label>
    </div>
  ));

  useEffect(() => {
    const sets = setValues.map((set) =>
      set
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    );
    props.setSets(sets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValues]);

  return (
    <section className="Sets">
      <h1>Conjuntos</h1>
      <h3>
        Adicione elementos aos conjuntos separando-os por virgulas (Exemplo: "1,
        2, A, X")
      </h3>
      {setElements}
      {setValues.length < MAX_SETS ? (
        <button className="Sets-add" onClick={addSet}>
          Adicionar
        </button>
      ) : null}
    </section>
  );
};

export default Sets;
