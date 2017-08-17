import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { Link } from 'react-router-dom';
// import { fetchCitation } from '../../actions/citations';
// import MatchAuthenticated from '../../components/MatchAuthenticated';

const styles = StyleSheet.create({
  link: {
    color: 'var(--palette-med-gray)',
    fontSize: '22px',
    fontWeight: 'bold',
    width: '45%',
    textAlign: 'center',
    ':hover': {
      textDecoration: 'none',
    },

    ':focus': {
      textDecoration: 'none',
    },
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1500px',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  left: {
    width: '25%',
  },

  logoutButton: {
    width: '25%',
    textAlign: 'right',
    padding: '0',
    background: 'transparent',
    border: '0',
    cursor: 'pointer',
  },

  badge: {
    justifyContent: 'center',
    color: 'var(--palette-med-gray)',
    background: 'rgba(255,255,255,.2)',
    borderRadius: '5px',
  }
});

type Props = {
  citation: {
    id: number,
    title: string,
    source: string,
    quote: string,
    user_id: number
  },
  
  currentUserCitationIds: Array
};

const partial = (fn, ...args) => fn.bind(null, ...args)

const CitationListItem = (props) => {
  const handleDeleteCitation = props.handleDeleteCitation.bind(null, props.citation.id);

  return (
    <div key={props.citation.id} className={`card ${css(styles.card)}`}>
      <div className={`buttonRow ${css(styles.buttonRow)}`} >
        <div className={`left ${css(styles.left)}`}></div>
        
        <Link className={css(styles.link)} to={`/user/${props.citation.user_id}/citations/${props.citation.id}`}>
          <h2>{props.citation.title}</h2>
        </Link>
        
        <button type="button" className={css(styles.logoutButton)} onClick={handleDeleteCitation}>
          <div className={css(styles.badge)}>
            <span className="fa fa-trash" />
          </div>
        </button>
      </div>

      <span>{props.citation.user_id} - {props.citation.id}</span>
      <span>{props.citation.source}</span>
      <span>{props.citation.quote}</span>
    </div>
  );
};

export default CitationListItem;