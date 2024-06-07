import React from 'react';

const Card = ({ email, bookName, userPic, coverPic, username, price, userID, isbnNumber }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={coverPic} alt="Cover pic not found" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{bookName}</div>
        <p className="text-gray-700 text-base">
          <strong>Author:</strong> {username}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Email:</strong> {email}
        </p>
        <p className="text-gray-700 text-base">
          <strong>ISBN:</strong> {isbnNumber}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Price:</strong> ${price}
        </p>
      </div>
    </div>
  );
};

export default Card;
