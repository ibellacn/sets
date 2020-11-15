import React, { ChangeEvent, useEffect, useState } from "react";

import "./Operations.css";

type PropsType = {
  sets: string[][];
};

const Operations = (props: PropsType) => {
  const [operation, setOperation] = useState<number>(0);
  const [firstSet, setFirstSet] = useState<string[]>([]);
  const [secondSet, setSecondSet] = useState<string[]>([]);
  const [result, setResult] = useState<string[]>();
  const setLabels = ["A", "B", "C", "D", "E"];

  const onChangeOperation = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setOperation(+value);
  };

  const universe = () => {
    const elements: string[] = [];
    props.sets.forEach((set) => {
      elements.concat(set);
    });

    const universe = new Set([...elements]);
    return Array.from(universe);
  };

  const union = () => {
    const union = new Set([...firstSet, ...secondSet]);
    return Array.from(union);
  };

  const intersection = () => {
    const intersection = new Set(
      [...firstSet].filter((x) => secondSet.includes(x))
    );

    return Array.from(intersection);
  };

  const complement = () => {
    // TODO
    return [];
  };

  const difference = () => {
    const difference = new Set(
      [...firstSet].filter((x) => !secondSet.includes(x))
    );
    return Array.from(difference);
  };

  const powerset = () => {
    const powerset = union().reduce(
      (subsets: any, value: any) =>
        subsets.concat(subsets.map((set: any) => [...set, value])),
      [[]]
    );

    return Array.from(powerset as any[]);
  };

  useEffect(() => {
    switch (operation) {
      case 0:
        setResult(universe());
        break;
      case 1:
        setResult(union());
        break;
      case 2:
        setResult(intersection());
        break;
      case 3:
        setResult(complement());
        break;
      case 4:
        setResult(difference());
        break;
      case 5:
        setResult(powerset());
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sets, operation, firstSet, secondSet]);

  return (
    <section className="Operations">
      <h1>Operações</h1>
      <h3>
        Selecione uma das operações a serem realizadas com os conjuntos dados
        anteriormente
      </h3>
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

      <div className="Operations-setSelection">
        <strong>Quais os conjuntos?</strong>
        <label>
          <span>Primeiro Conjunto</span>
          <select
            defaultValue="default"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setFirstSet(props.sets[+event.target.value]);
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
        <label>
          <span>Segundo Conjunto</span>
          <select
            defaultValue="default"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setSecondSet(props.sets[+event.target.value]);
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
      </div>

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
