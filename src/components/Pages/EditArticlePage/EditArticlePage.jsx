import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchArticle, deleteRequestStatus } from 'Store/Slices/articlesSlice';
import ArticleForm from 'components/ArticleForm/ArticleForm';
import Loader from 'components/Loader/Loader';
import Error from 'components/Error/Error';

import s from './EditArticlePage.module.scss';

function EditArticlePage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { error, loading, currentArticle: article } = useSelector((state) => state.articlesList);

  useEffect(() => {
    dispatch(fetchArticle(slug));
    return () => dispatch(deleteRequestStatus());
  }, [dispatch]);

  if (error) return <Error />;
  if (loading || !article) return <Loader />;
  return (
    <div className={s.container}>
      <ArticleForm page="Edit" article={article} slug={slug} />
    </div>
  );
}

export default EditArticlePage;
