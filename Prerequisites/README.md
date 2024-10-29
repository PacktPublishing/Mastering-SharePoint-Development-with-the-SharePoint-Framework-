# Building a SharePoint Web Part - Using Microsoft Graph API to get items

The following prerequisites needs to be deployed on a SharePoint site to be able to follow the section "Using Microsoft Graph API to get items".

1. Install the [`PnP.PowerShell`](https://pnp.github.io/powershell/articles/installation.html) PowerShell module locally by following the procedure. It requires PowerShell 7.2 or later. You will also need to create a [dedicated Microsoft Entra ID application](https://pnp.github.io/powershell/articles/registerapplication.html#automatically-create-an-app-registration-for-interactive-login) to connect to SharePoint with the API permission (delegated) `Sites.Manage.All`.

> The following script has been tested with `PnP.PowerShell` version **2.5.0**.

2. Run the `deploy.ps1 -SiteUrl <your_sharepoint_site_url> -ClientId <Entra ID application GUID used for PnP PowerShell>` script to deploy the solution on your SharePoint site.

3. Grant SPO Entra ID application the `Sites.Read.All` permissions to be able to use Microsoft Graph. You can do it using either **m365 CLI** or **SPO PowerShell** as explained [here](https://www.voitanos.io/blog/consider-avoiding-declarative-permissions-with-azure-ad-services-in-sharepoint-framework-projects/#recommendation-grant-spo-entra-id-permissions-with-powershell-or-the-cli-for-microsoft-365)

With Microsoft 365 CLI
```shell
m365 login
m365 spo serviceprincipal grant add --resource 'Microsoft Graph' --scope 'Sites.Read.All'
```

Wih SPO PowerShell

```powershell
Connect-SPOService -Url https://<tenant>-admin.sharepoint.com
Approve-SPOTenantServicePrincipalPermissionGrant --Resource 'Microsoft Graph' --Scope 'Sites.Read.All'
```



