import { useEffect, useState } from "react";
import styles from "../styles/categorySelect.module.css";
import { useSession } from "next-auth/react";

export default function CategorySelect(props) {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({
    id: 1,
    title: "Select a Category",
    color: "Black",
    icon: "📁",
    user: 1,
  });
  const [selectCategory, setselectCategory] = useState(true);
  const [creatingCategory, setCreatingCategory] = useState(false);

  async function getCategories() {
    const request = await fetch(`/api/categories`);
    const data = await request.json();
    setCategories(data.categories);
  }

  async function dbDelete(id) {
    const req = await fetch("/api/categories/delete", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    });
    if (!req.ok) {
      throw Error(req.statusText);
    }
    return await req.json();
  }

  const deleteItem = (e) => {
    const items = categories;
    const index = categories.indexOf(e);
    items.splice(index, 1);
    setCategories(items);
    dbDelete(e.id);
  };

  useEffect(() => {
    getCategories();
  });

  return (
    <div className={styles.project_select_container}>
      {creatingCategory && (
        <CategoryCreateModal onCompleted={() => setCreatingCategory(false)} />
      )}
      {creatingCategory && (
        <div
          onClick={() => setCreatingCategory(false)}
          className={styles.backdrop}
        ></div>
      )}
      <span className={styles.projects_title}>Projecs</span>

      {selectCategory ? (
        <div
          onClick={() => setselectCategory(false)}
          id={styles.selectedProject}
          className={styles.projects_select}
        >
          <div
            className={styles.project_color}
            style={{ background: currentCategory.color }}
          >
            {currentCategory.icon}
          </div>
          <p className={styles.project_title}>{currentCategory.title}</p>
        </div>
      ) : (
        <div className={styles.projects_select_modal}>
          {categories.map((x, y) => (
            <div key={y} className={styles.project_item_select_container}>
              <div
                onClick={() => {
                  setCurrentCategory(x);
                  props.currentCategory(x);
                  console.log(selectCategory);
                  setselectCategory(true);
                }}
                className={styles.projects_select}
                key={y}
              >
                <div
                  className={styles.project_color}
                  style={{ background: x.color }}
                >
                  {x.icon}
                </div>
                <p className={styles.project_title}>{x.title}</p>
              </div>
              <i className="bi bi-trash" onClick={() => deleteItem(x)}></i>
            </div>
          ))}
          <div
            id={styles.addNew}
            onClick={() => setCreatingCategory(true)}
            className={styles.projects_select}
          >
            <div className={styles.project_color}>
              {" "}
              <p>+</p>
            </div>
            <p className={styles.project_title}>Add New</p>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryCreateModal(props) {
  const [categoryColor, setCategoryColor] = useState("#000000");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const { data: session } = useSession();

  async function addCategory() {
    const request = await fetch("/api/categories/add", {
      method: "POST",
      body: JSON.stringify({
        title: categoryTitle,
        icon: categoryIcon,
        color: categoryColor,
        User: { connect: { email: session.user.email } },
      }),
    });
    if (!request.ok) {
      throw Error(request.statusText);
    }
    return await request.json();
  }

  return (
    <div className={styles.category_create_modal}>
      <span>Select Category Color</span>
      <input
        className={styles.color_input}
        value={categoryColor}
        onChange={(e) => setCategoryColor(e.target.value)}
        type="color"
      />
      <input
        className={styles.title_input}
        value={categoryIcon}
        onChange={(e) => setCategoryIcon(e.target.value)}
        placeholder="Icon"
        type="text"
      />
      <input
        className={styles.icon_input}
        onChange={(e) => setCategoryTitle(e.target.value)}
        placeholder="Category Title"
        type="text"
      />
      <p
        onClick={() => {
          console.log(categoryColor, categoryIcon, categoryTitle);
          addCategory();
          props.onCompleted();
        }}
      >
        +
      </p>
    </div>
  );
}
