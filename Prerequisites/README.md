# Building a SharePoint Web Part - Using Microsoft Graph API to get items

The following prerequisites needs to be deployed on a SharePoint site to be able to follow the section "Using Microsoft Graph API to get items".

1. Install the [`PnP.PowerShell`](https://pnp.github.io/powershell/articles/installation.html) PowerShell module locally by following the procedure. It requires PowerShell 7.2 or later. You will also need to create a [dedicated Microsoft Entra ID application](https://pnp.github.io/powershell/articles/registerapplication.html#automatically-create-an-app-registration-for-interactive-login) to connect to SharePoint with the API permission (delegated) `Sites.Manage.All`.

> The following script has been tested with `PnP.PowerShell` version **2.5.0**.

2. Run the `deploy.ps1 -SiteUrl <your_sharepoint_site_url> -ClientId <Entra ID application GUID used for PnP PowerShell>` script to deploy the solution on your SharePoint site.