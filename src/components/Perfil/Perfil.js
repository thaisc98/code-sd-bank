import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deletePerfil } from "../../state-mgmt/actions/perfil-actions";

const Perfil = ({ perfil, deletePerfil }) => {
  return <div></div>;
};

Perfil.prototype = {
  perfil: PropTypes.object.isRequired,
  deletePerfil: PropTypes.func.isRequired,
};

export default connect(null, { deletePerfil })(Perfil);
