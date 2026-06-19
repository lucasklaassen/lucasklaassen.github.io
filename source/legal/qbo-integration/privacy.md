---
title: Privacy Policy
subtitle: LMK QBO Integration
layout: page
permalink: /legal/qbo-integration/privacy/
comment: false
description: Privacy policy for the LMK QBO Integration internal tool.
---

*Last updated: June 19, 2026*

## Who

This integration is used exclusively by Lucas Klaassen / LMK Management Inc. There are no external users.

## What We Access

The integration accesses QuickBooks Online data needed for internal bookkeeping and reporting, via Intuit's official API. The specific data depends on the API scopes granted during OAuth authorization.

## What We Don't Do

We do not sell, share, or use your QuickBooks data for advertising. Data is not provided to any third party.

## Storage

OAuth tokens are stored locally on the developer's machine in a `.env` file. There is no public server database holding QuickBooks credentials or data.

## Third Parties

The only external service involved is Intuit (QuickBooks Online), which is the data source. No other third-party services receive QuickBooks data from this integration.

## Disconnect and Deletion

To disconnect, revoke access in Intuit → Settings → Connected Apps. Local tokens can be deleted by removing them from the `.env` file on the developer's machine.

## Contact

Questions about this policy: [hello@lucasklaassen.com](mailto:hello@lucasklaassen.com)

## Related

- [Overview](/legal/qbo-integration/)
- [End User License Agreement](/legal/qbo-integration/eula/)
