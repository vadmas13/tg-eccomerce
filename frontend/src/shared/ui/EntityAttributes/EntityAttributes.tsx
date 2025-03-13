import { parseAttributes } from "@shared/utils";
import { FC } from "react";

type EntityAttributesProps = {
  attributesString: string;
};

const EntityAttributes: FC<EntityAttributesProps> = ({ attributesString }) => {
  const attributes = parseAttributes(attributesString);

  return (
    <div className="mt-6">
      <h4 className="mb-2 font-bold">Характеристики</h4>
      {Object.keys(attributes).map((x) => (
        <div key={x} className="grid grid-cols-[1fr_3fr]">
          <div>{x}</div>
          <div>{attributes[x]}</div>
        </div>
      ))}
    </div>
  );
};

export default EntityAttributes;
