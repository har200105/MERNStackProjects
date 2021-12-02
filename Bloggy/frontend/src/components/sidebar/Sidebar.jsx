import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";
import { API } from "../../API";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  const getCats = async () => {
    await axios.get(`${API}/getCategories`).then((s) => {
      if (s.status === 201) {
        setCategories(s.data);
      }
    });
  }

  useEffect(() => {
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {

            categories?.map((c) => (
              <li className="sidebarListItem">
                <Link className="link" to={`/getCatPost/${c._id}`}>
                  {c.name}
                </Link>
              </li>
            ))

          }
        </ul>
      </div>
    </div>
  );
}
