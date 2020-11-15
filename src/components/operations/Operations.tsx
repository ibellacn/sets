import React, { ChangeEvent, useEffect, useState } from "react";

import {
  complement,
  difference,
  intersection,
  powerset,
  union,
  universe,
} from "../../utils/algorithms";

import "./Operations.css";

type PropsType = {
  sets: string[][];
};

const Operations = (props: PropsType) => {
  const [operation, setOperation] = useState<number | null>(null);
  const [firstSetIndex, setFirstSetIndex] = useState<number | null>(null);
  const [secondSetIndex, setSecondSetIndex] = useState<number | null>(null);
  const [result, setResult] = useState<string[]>();
  const setLabels = ["A", "B", "C", "D", "E"];

  const onChangeOperation = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setOperation(+value);
  };

  useEffect(() => {
    switch (operation) {
      case 0:
        setResult(universe(props.sets));
        break;
      case 1:
        if (firstSetIndex === null || secondSetIndex === null) {
          return;
        }
        setResult(union(props.sets[firstSetIndex], props.sets[secondSetIndex]));
        break;
      case 2:
        if (firstSetIndex === null || secondSetIndex === null) {
          return;
        }
        setResult(
          intersection(props.sets[firstSetIndex], props.sets[secondSetIndex])
        );
        break;
      case 3:
        if (firstSetIndex === null) {
          return;
        }
        setResult(complement(props.sets, props.sets[firstSetIndex]));
        break;
      case 4:
        if (firstSetIndex === null || secondSetIndex === null) {
          return;
        }
        setResult(
          difference(props.sets[firstSetIndex], props.sets[secondSetIndex])
        );
        break;
      case 5:
        if (firstSetIndex === null) {
          return;
        }
        setResult(powerset(props.sets[firstSetIndex]));
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sets, operation, firstSetIndex, secondSetIndex]);

  return (
    <section className="Operations">
      <h1>Operações</h1>
      <h2 className="u-bottom-20">
        Selecione uma das operações a serem realizadas com os conjuntos dados
        anteriormente
      </h2>
      <div className="Operations-options">
        <strong>Qual a operação?</strong>
        <label>
          <span>Operação</span>
          <select defaultValue="default" onChange={onChangeOperation}>
            <option value="default">Selecione uma opção...</option>
            <option value="0">Universo</option>
            <option value="1">União</option>
            <option value="2">Interseção</option>
            <option value="3">Complementar</option>
            <option value="4">Diferença</option>
            <option value="5">Conjunto das Partes</option>
          </select>
        </label>
      </div>

      {operation && operation !== 0 ? (
        <div className="Operations-setSelection">
          <strong>Quais os conjuntos?</strong>
          <label>
            <span>Primeiro Conjunto</span>
            <select
              defaultValue="default"
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                setFirstSetIndex(+event.target.value);
              }}
            >
              <option disabled value="default">
                Selecione uma opção...
              </option>
              {props.sets.map((_, index) => (
                <option key={index} value={index}>
                  Conjunto {setLabels[index]}
                </option>
              ))}
            </select>
          </label>
          {operation !== 3 && operation !== 5 ? (
            <label>
              <span>Segundo Conjunto</span>
              <select
                defaultValue="default"
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  setSecondSetIndex(+event.target.value);
                }}
              >
                <option disabled value="default">
                  Selecione uma opção...
                </option>
                {props.sets.map((_, index) => (
                  <option key={index} value={index}>
                    Conjunto {setLabels[index]}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>
      ) : null}

      {result ? (
        <div className="Operations-result">
          Resultado ={" "}
          {JSON.stringify(result)
            .replaceAll("[", "{")
            .replaceAll("]", "}")
            .replaceAll(`"`, "")}
        </div>
      ) : null}
    </section>
  );
};

export default Operations;
