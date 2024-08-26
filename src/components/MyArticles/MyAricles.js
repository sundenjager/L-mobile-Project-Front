import React, { useState, useEffect } from "react";
import {
  getArticles,
  updateArticle,
  deleteArticle,
  addArticle,
} from "../../api/ArticleService";
import ArticleTable from "./ArticleTable";
import ArticleForm from "./ArticleForm";
import "./table.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../MyHeader/Header";

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTableVisible, setTableVisible] = useState(true);
  const [formErrorMessage, setFormErrorMessage] = useState(""); // State to store the form error message
  const articlesPerPage = 2;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const [editingArticle, setEditingArticle] = useState(null);
  const [formState, setFormState] = useState({
    category: "",
    price: "",
    quantity: "",
    createdById: "",
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesData = await getArticles();
        setArticles(articlesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
        alert("Failed to fetch articles");
      }
    };

    fetchArticles();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id);
        const articlesData = await getArticles();
        setArticles(articlesData);
        alert("Article deleted successfully");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'article :", error);
        alert("Failed to delete article");
      }
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormState(article);
    setTableVisible(false);
  };

  const handleUpdateArticle = async (updatedArticle) => {
    try {
      const updatedData = await updateArticle(updatedArticle);
      const updatedArticles = articles.map((article) =>
        article.id === updatedArticle.id ? updatedData : article
      );
      setArticles(updatedArticles);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article :", error);
      setFormErrorMessage("Failed to update article");
    }
  };

  const handleSave = async () => {
    setFormErrorMessage(""); // Clear any previous error messages

    try {
      if (editingArticle) {
        const updatedArticle = {
          ...editingArticle,
          ...formState,
        };
        await handleUpdateArticle(updatedArticle);
        const articlesData = await getArticles();
        setArticles(articlesData);
      } else {
        const newArticle = {
          ...formState,
        };
        await addArticle(newArticle);
        const articlesData = await getArticles();
        setArticles(articlesData);
      }
      setEditingArticle(null);
      setTableVisible(true);
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour de l'article :", error);
      setFormErrorMessage("Failed to add article"); // Set error message for adding
    }
  };

  const handleCancel = () => {
    setEditingArticle(null);
    setTableVisible(true);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddArticle = () => {
    setEditingArticle(null);
    setFormState({
      category: "",
      price: "",
      quantity: "",
      createdById: "",
    });
    setTableVisible(false);
  };

  return (
    <div className="page-content">
      <Header />
      <h1>Articles</h1>
      {isTableVisible ? (
        <ArticleTable
          articles={articles}
          currentArticles={currentArticles}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
          handleAddArticle={handleAddArticle}
        />
      ) : (
        <ArticleForm
          formState={formState}
          handleChange={handleChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          editingArticle={editingArticle}
          formErrorMessage={formErrorMessage} // Pass the general form error message to the form
        />
      )}
    </div>
  );
};

export default MyArticles;
