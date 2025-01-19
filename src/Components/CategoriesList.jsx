import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getAllCategorie } from '../redux/actions';
import EditCategorie from './EditCategorie';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoriesList = () => {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategorie());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));  // Appelle la fonction de suppression via Redux
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Liste des catégories</h2>
      <div className="table-responsive">
        <table className="table">
          <thead class="table-dark">
            <tr>
        
              <th>Nom de la catégorie</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map(category => (
                <tr key={category.id}>
            
                  <td>{category.nomCategorie}</td>
                  <td>{category.description}</td>
                  <td>
                    <EditCategorie categorie={category} />
                    <button 
                      className="btn btn-danger btn-sm ml-2"
                      onClick={() => handleDelete(category.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">Aucune catégorie disponible</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesList;
