import client from "./client";

export const getShelterAniamlList = (id) => {
  return client.get(`shelter/${id}/pets`);
};

export const getShleterAdoptList = ( id ) => {
  return client.get(`shelter/${id}/adopts`);
};

export const getShelterAdoptDetail = ({ id, adoptId }) => {
  return client.get(`shelter/${id}/adopts/${adoptId}`);
};

export const changeAdoptStatus = ({ id, adoptId, status }) => {
  return client.put(`shelter/${id}/adopts/${adoptId}`, 
                    { acceptStatus: status });
};

export const registerAdopt = ( adoptRegisterForm ) => {
  return client.post(`consumers/${id}/adopts`, adoptRegisterForm);
}

export const getConsumerAdoptList = ( id ) => {
  return client.get(`consumers/${id}/adopts`);
}

export const getConsumerAdoptDetail = ({ id, adoptId }) => {
  return client.get(`consumers/${id}/adopts/${adoptId}`);
}