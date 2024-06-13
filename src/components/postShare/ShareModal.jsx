import React, { useRef } from 'react';
import CustomModal from '../utils/modal/CustomModal';
import PostShare from '../postShare/PostShare'
import PropTypes from 'prop-types'

const ShareModal = ({nameId}) => {

    const refModal = useRef(null)

    return (
        <React.Fragment>
            <CustomModal nameId={nameId} ref={refModal}>
                <PostShare/>
            </CustomModal>
        </React.Fragment>
    );
};


ShareModal.propTypes = {
    nameId:PropTypes.string
}

export default ShareModal;