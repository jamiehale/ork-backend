import { Router } from 'express';
import { campaignsFromDocuments, campaignFromDocument } from '../../models/campaigns';

const getCampaigns = repository => (req, res) => {
  repository.readCampaigns()
    .then(campaignsFromDocuments)
    .then((campaigns) => {
      res.json(campaigns);
    });
};

const getCampaign = repository => (req, res) => {
  const { id: campaignId } = req.params;
  repository.readCampaign(campaignId)
    .then(campaignFromDocument)
    .then((campaign) => {
      res.json(campaign);
    });
};

export default (repository) => {
  const routes = Router();

  routes.get('/', getCampaigns(repository));
  routes.get('/:id', getCampaign(repository));

  return routes;
};
