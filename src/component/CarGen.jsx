import React, { useState } from "react";
const char = [
  {
    id: 1,
    name: "SpongeBob SquarePants",
    description:
      "The main character of the show. An optimistic and energetic sea sponge.",
    imageUrl: "bobsponge.png",
  },
  {
    id: 2,
    name: "Patrick Star",
    description: "SpongeBob's best friend, a friendly and silly starfish.",
    imageUrl: "./patrick.png",
  },
];

const Dashboard = () => {
  const [edit, setedit] = useState(false);
  const [charCopy, setCharCopy] = useState([1]);
  const [charEdited, setCharEdited] = useState({ "": 0 });
  const [appear, setappear] = useState(false);
  const [characters, setCharacters] = useState(char);

  const handleDelete = (id) => {
    let tmp = [...characters];
    tmp.splice(id, 1);
    setCharacters(tmp);
  };
  const EditFnc = (e) => {
    let { name, value, dataset } = e.target;
    let { key } = dataset;
    setCharEdited({
      ...charEdited,
      [name]: value,
      imageUrl: characters[key].imageUrl,
    });
    let tmp = [...characters];
    tmp[key] = charEdited;
    setCharacters(tmp);
  };

  return (
    <div>
      {characters
        ? characters.map((e, i) => {
            let { imageUrl, name, description } = e;

            return (
              <div>
                <img
                  src={imageUrl}
                  style={{ width: "100px", cursor: "pointer" }}
                  onClick={() => setappear(!appear)}
                />

                {appear ? (
                  <div>
                    {edit ? (
                      <div>
                        <input
                          name="name"
                          type="text"
                          defaultValue={name}
                          onChange={EditFnc}
                          data-key={i}
                        />
                        <input
                          name="description"
                          type="text"
                          defaultValue={description}
                          onChange={EditFnc}
                          data-key={i}
                        />
                      </div>
                    ) : (
                      <div>
                        <p>{name}</p>
                        <p>{description}</p>
                      </div>
                    )}
                    {edit ? (
                      <div>
                        <button onClick={() => setedit(false)}>save</button>{" "}
                        <button
                          onClick={() => {
                            setedit(false);
                            setCharacters(charCopy);
                          }}
                        >
                          cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => handleDelete(i)}>Delete</button>
                        <button
                          onClick={() => {
                            setedit(true);
                            setCharCopy(characters);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Dashboard;
