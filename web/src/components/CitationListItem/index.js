import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1500px',
    marginLeft: '2rem',
    alignItems: 'center',
    justifyContent: 'center',
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

const CitationListItem = ({ citation, currentUserCitationIds, onCitationJoin }: Props) => {
  return (
    <div key={citation.id} className={`card ${css(styles.card)}`}>
      <h2>{citation.title}</h2>
      <span>{citation.source}</span>
      <span>{citation.quote}</span>
    </div>
  );
};

export default CitationListItem;