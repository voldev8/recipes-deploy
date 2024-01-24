import React from 'react';

const NoLink = () => {
  const styles = {
    fontSize: '1.6rem',
    color: '#c0392b',
    fontWeight: '600',
  };
  return (
    <div className="container" style={styles}>
      <p>Sorry, there is not a link for this recipe!</p>
    </div>
  );
};

export default NoLink;
