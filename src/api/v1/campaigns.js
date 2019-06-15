import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { campaignsFromDocuments, campaignFromDocument } from '../../models/campaigns';

const getCampaigns = repository => (req, res) => {
  repository.readCampaigns()
    .then(campaignsFromDocuments)
    .then((campaigns) => {
      res.json(campaigns);
    });
};

const validateCampaignId = (id) => {
  if (!ObjectId.isValid(id)) {
    const error = new Error('Invalid campaign ID');
    error.status = 400;
    throw error;
  }
};

const getCampaign = repository => (req, res) => {
  const { id: campaignId } = req.params;
  validateCampaignId(campaignId);
  repository.readCampaign(campaignId)
    .then(campaignFromDocument)
    .then((campaign) => {
      res.json(campaign);
    });
};

const postCampaign = repository => (req, res) => {
  const { campaign } = req.body;
  repository.createCampaign(campaign)
    .then(campaignFromDocument)
    .then((newCampaign) => {
      res.json(newCampaign);
    });
};

export default (repository) => {
  const routes = Router();

  routes.get('/', getCampaigns(repository));
  routes.get('/:id', getCampaign(repository));
  routes.post('/', postCampaign(repository));

  return routes;
};
