import { Routes, Route } from "react-router-dom";
import Room from "./Room/Room";
import LiveClass from "./LiveClass";
import PropTypes from "prop-types";

function Class({ classId }) {
    return (
        <>
            <Routes>
                <Route path="/" element={<LiveClass classId={classId} />} />
                <Route path="/room/:roomId" element={<RoomWrapper classId={classId} />} />
            </Routes>
        </>
    );
}

function RoomWrapper({ classId }) {
   console.log(classId);
    return <Room classId={classId} />;
}

Class.propTypes = {
    classId: PropTypes.string.isRequired,
};
RoomWrapper.propTypes = {
    classId: PropTypes.string.isRequired,
};
export default Class;
