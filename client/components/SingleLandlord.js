import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleLandlord} from '../store/singleLandlord'
import {TagCloud} from 'react-tagcloud'

const SingleLandlord = props => {
  const {landlord, getSingleLandlord, reviews} = props
  const {name} = landlord

  return (
    <div className="container">
      <h4>Landlord Summary</h4>
      <div>
        <p>Name: {name}</p>
        <p>Overall Rating: {rating}</p>
        <p>Total Reviews: {reviews}</p>
        <p>Total Buildings: {buildings}</p>
      </div>
      <h4>Tag Cloud</h4>
      <div>
        <TagCloud minSize={12} maxSize={35} tags={reviews} />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    landlord: state.landlord.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleLandlord: id => dispatch(fetchSingleLandlord(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleLandlord)
