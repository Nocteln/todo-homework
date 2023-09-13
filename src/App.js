import { useState } from "react";
import "./App.css";

const tasks = [
  {
    nom: "Lorem",
    text: "Lorem ipsum dolor sit amet, consectetur",
    id: "1",
    date: "2023-08-13",
  },
  {
    nom: "Lorem",
    text: "Lorem ipsum dolor sit amet, consectetur",
    id: "2",
    date: "2023-09-13",
  },
  {
    nom: "Lorem",
    text: "Lorem ipsum dolor sit amet, consectetur",
    id: "3",
    date: "2023-09-13",
  },
  {
    nom: "Lorem",
    text: "Lorem ipsum dolor sit amet, consectetur",
    id: "4",
    date: "2023-09-13",
  },
];

export default function App() {
  const [items, setItems] = useState(tasks);

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div>
      <Header />
      <div className="page">
        <AddForm onAddItem={handleAddItems} />
        <List onDeleteItem={handleDeleteItem} items={items} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header>
      <h2>To-Do</h2>
    </header>
  );
}

function AddForm({ onAddItem }) {
  const [formTitre, setFormTitre] = useState("");
  const [formText, setFormText] = useState("");
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));

  function handleForm(e) {
    e.preventDefault();

    if (!formText || !formTitre) return;

    const newItem = {
      nom: formTitre,
      text: formText,
      id: Math.random() * 5000,
      date: date,
    };

    onAddItem(newItem);

    setFormText("");
    setFormTitre("");
    setDate(new Date().toJSON().slice(0, 10));
  }

  return (
    <div className="form" onSubmit={handleForm}>
      <h2>Rajouter une tache</h2>
      <form>
        <label className="label" for="titre">
          Titre:
        </label>
        <input
          type="text"
          id="titre"
          placeholder="nom..."
          value={formTitre}
          onChange={(e) => setFormTitre(e.target.value)}
        />

        <label for="text" className="label">
          Contenu:
        </label>
        <textarea
          id="text"
          placeholder="lorem ipsum..."
          value={formText}
          onChange={(e) => setFormText(e.target.value)}
        ></textarea>

        <label for="date" className="label">
          A faire pour :
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toJSON().slice(0, 10)}
        />
        <button>Ajouter</button>
      </form>
    </div>
  );
}

function List({ onDeleteItem, items }) {
  return (
    <div className="list">
      {items.map((tache) => (
        <Task key={tache.id} task={tache} onDeleteItem={onDeleteItem} />
      ))}
    </div>
  );
}

function Task({ task, onDeleteItem }) {
  const currentDate = new Date().toJSON().slice(0, 10);
  return (
    <div className={`item ${task.date < currentDate ? "passe" : ""}`}>
      <div>
        <h1>{task.date < currentDate ? task.nom + " (passé)" : task.nom}</h1>
        <h3>{task.text}</h3>
        <h4>A faire pour le {task.date}</h4>
      </div>
      <button onClick={() => onDeleteItem(task.id)}>❌</button>
    </div>
  );
}
