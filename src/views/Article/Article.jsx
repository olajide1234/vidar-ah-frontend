/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import {
  Container,
  CardDeck
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import ArticleTitle from '../../components/articleTitle/ArticleTitle';
import ArticleBody from '../../components/articleBody/ArticleBody';
import ImageContainer from '../../components/imageContainer/ImageContainer';
import ArticleSummary from '../../components/articleSummary/ArticleSummary';
import ArticleDescription from '../../components/articleDescription/ArticleDescription';
import { getArticleRequest } from '../../redux/actions/articles';
import Footer from '../../components/footer/Footer';

import Loader from '../../components/loader/Loader';

const Article = (props) => {
  const { article, getArticle } = props;
  const { match: { params: { slug } } } = props;
  useEffect(() => {
    getArticle(slug);
  }, []);

  if (!article) return <Loader />;

  return (
    <div className="article-container">
      <Container>
        <Header type="purple" />
      </Container>
      <Container>
        <ArticleTitle title={article.title} />
        <ArticleDescription description={article.description} />
        <ImageContainer src={article.images[0] || 'https://res.cloudinary.com/djdsxql5q/image/upload/v1554806589/Authors%20Haven/culture.jpg'} />
        <ArticleBody body={article.body} />
      </Container>
      <hr />
      <Container>
        <h3>Also recommended for you</h3>
        <CardDeck>
          {
              props.recommendedArticles.map(recArticle => (
                <ArticleSummary
                          key={recArticle.id}
                          src={recArticle.images[0]}
                          header={recArticle.title}
                          slug={recArticle.slug}
                          time={recArticle.updatedAt}
                        />
              ))
            }
        </CardDeck>
      </Container>
      <Footer />
    </div>
  );
};
Article.propTypes = {
  article: PropTypes.instanceOf(Object),
  getArticle: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  recommendedArticles: PropTypes.array.isRequired
};

Article.defaultProps = {
  article: null,
};

const mapStateToProps = state => ({
  article: state.articleReducer.article,
  recommendedArticles: state.articleReducer.trendingArticles.slice(0, 4)
});

const mapDispatchToProps = dispatch => ({
  getArticle: slug => dispatch(getArticleRequest(slug)),
});

const ConnectedArticle = connect(mapStateToProps, mapDispatchToProps)(Article);
export default ConnectedArticle;
