import * as React from "react";
import axios from "axios";

export default function App() {
  const [메뉴, set메뉴] = React.useState([]);
  const [공간명, set공간명] = React.useState([]);
  const [내외부, set내외부] = React.useState([]);
  const [마감재료, set마감재료] = React.useState([]);
  const [부위명, set부위명] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/api/menu");
      set메뉴(result.data.menu.메뉴);
      set공간명(result.data.menu.공간명);
      set내외부(result.data.menu.내외부);
      set마감재료(result.data.menu.마감재료);
      set부위명(result.data.menu.부위명);
    };
    fetchData();
  }, []);

  return (
    <div className="flex p-4 w-full">
      {/* 메뉴 */}
      <div className="w-full flex justify-around items-start">
        {/*
         {메뉴.map((item, index) => (
          <div key={index}>
            <div className="text-xl font-bold">{item}</div>
          </div>
        ))} 
        */}
        <div className="flex justify-center items-center flex-col">
          <h2 className="text-lg font-bold">[공간명]</h2>
          {공간명.map((item, idx) => (
            <div className="checkbox w-[140px]" key={idx}>
              <input type="checkbox" id={item} />
              <label className="p-1" htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center flex-col">
          <h2 className="text-lg font-bold">[내/외부]</h2>
          {내외부.map((item, idx) => (
            <div className="checkbox w-[140px]" key={idx}>
              <input type="checkbox" id={item} />
              <label className="p-1" htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center flex-col">
          <h2 className="text-lg font-bold">[마감재료]</h2>
          {마감재료.map((item, idx) => (
            <div className="checkbox w-[140px]" key={idx}>
              <input type="checkbox" id={item} />
              <label className="p-1" htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center flex-col">
          <h2 className="text-lg font-bold">[부위명]</h2>
          {부위명.map((item, idx) => (
            <div className="checkbox w-[140px]" key={idx}>
              <input type="checkbox" id={item} />
              <label className="p-1" htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
