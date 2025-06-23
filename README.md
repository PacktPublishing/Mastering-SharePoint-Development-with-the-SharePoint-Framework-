# Practical SharePoint Framework (SPFx) Development

<a href="https://www.packtpub.com/en-us/product/practical-sharepoint-framework-spfx-development-9781835466780"><img src="https://content.packt.com/B21924/cover_image.jpg?version=1748871043" alt="no-image" height="256px" align="right"></a>

This is the code repository for [Practical SharePoint Framework (SPFx) Development](https://www.packtpub.com/en-us/product/practical-sharepoint-framework-spfx-development-9781835466780), published by Packt.

**Build modern, scalable, and efficient business solutions for SharePoint and Microsoft 365**

## What is this book about?
This comprehensive guide helps you become a professional SharePoint Framework developer and deliver effective business solutions by teaching you to build, deploy, and manage robust SharePoint solutions through key concepts and real-world scenarios.

This book covers the following exciting features:
* Set up your machine and Microsoft 365 tenants to build SPFx solutions
* Understand and build SPFx web parts and extensions
* Share and reuse common code through SPFx library components
* Consume SharePoint, Microsoft Graph, Entra ID-secured, and anonymous APIs
* Automate solutions deployment with Azure DevOps pipelines or GitHub actions
* Speed up your SPFx development with community tools and libraries
* Publish and manage solutions on SharePoint AppSource

If you feel this book is for you, get your [copy](https://www.amazon.com/Practical-SharePoint-Framework-SPFx-Development/dp/1835466788/ref=sr_1_1?crid=1UIOXV9D3BZ2X&dib=eyJ2IjoiMSJ9.Q_gxoT-KCRxH61jbIOSy9HbJHpnN8fqs1sQI8NphXa38KC5aSlXw9pgjWrKA2dojlNyAJAacVjuOW_W81GOblw.qPwy1yYXH84fakz1f1Eh7sv5KVL56mV8dG9lMm2_n24&dib_tag=se&keywords=Practical+SharePoint+Framework+%28SPFx%29+Development&qid=1750666975&sprefix=%2Caps%2C964&sr=8-1) today!
<a href="https://www.packtpub.com/?utm_source=github&utm_medium=banner&utm_campaign=GitHubBanner"><img src="https://raw.githubusercontent.com/PacktPublishing/GitHub/master/GitHub.png" 
alt="https://www.packtpub.com/" border="5" /></a>

## Instructions and Navigations
You'll find here all the branches used for the different chapters/sections. For example, Chapter5.

The code will look like the following:
```
export interface IProductCatalogItem {
  modelName: string;
  retailPrice: number;
  stockLevel: number;
  lastOrderDate: Date;
  itemPicture: string;
  itemColour: string;
  size: ProductSizes;
  productReference: string;
}
```
**Following is what you need for this book:**
This book is ideal for experienced web developers looking to build modern SharePoint solutions using the SharePoint Framework. Basic knowledge of JavaScript, TypeScript, and Microsoft 365 will be beneficial. Familiarity with the SharePoint ecosystem will come in handy but is not essential. Existing SPFx developers who want to refresh their skills and get up to date with the latest features will also benefit from this book.

With the following software and hardware list you can run all code files present in the book (Chapter 1-22).

## Software and Hardware List
### Prerequisites
Before reading this book, experience with web development is strongly recommended. Additionally, having a basic understanding of Microsoft 365—especially SharePoint—is beneficial, though not required.

### Operating System Requirements
| Chapter | Software required | OS required |
| -------- | ------------------------------------ | ----------------------------------- |
| 1-22 | **Yeoman** | Windows, macOS, or Linux |
| 1-22 | **Gulp** | Windows, macOS, or Linux |
| 1-22 | **Node.js** - long-term support (LTS) version, preferably Node.js 18.x | Windows, macOS, or Linux |
| 1-22 | **Microsoft 365 developer tenant** | Windows, macOS, or Linux |

Windows 10 or 11** (preferred), **macOS**, or **Linux**.

### Running Samples from the GitHub Repository
To run the samples, you will also need:
- **Visual Studio Code** installed on your machine.
- A **Git client** to clone the GitHub repository and run the samples locally. You can use the built-in Git feature of Visual Studio or a tool like **SourceTree** or **GitHub Desktop**.
- A **Microsoft 365 tenant** to test and deploy samples. You can get one for free by joining the [Microsoft 365 Developer Program](https://developer.microsoft.com/en-us/microsoft-365/dev-program).

### Additional Notes
If you are using the digital version of the book, we advise you to **type the code yourself** or access the code from this repository. Doing so will help you avoid any potential errors related to copying and pasting code.

## Related products
* Workflow Automation with Microsoft Power Automate, Second edition [[Packt]](https://www.packtpub.com/en-us/product/workflow-automation-with-microsoft-power-automate-second-edition-9781803237671) [[Amazon]](https://www.amazon.com/Workflow-Automation-Microsoft-Power-Automate/dp/1803237678/ref=sr_1_1?dib=eyJ2IjoiMSJ9.XWNr3MX-aGpwN94xMvzg1TF7Ru2chctXZ5N2GDqI2zA.kraap7ycphECDYd1z5Q4Jx2QRZc1atkYpZSsq4rRmAY&dib_tag=se&keywords=Workflow+Automation+with+Microsoft+Power+Automate%2C+Second+edition&qid=1750667402&sr=8-1)

* Microsoft 365 and SharePoint Online Cookbook [[Packt]](https://www.packtpub.com/en-us/product/microsoft-365-and-sharepoint-online-cookbook-9781803243177) [[Amazon]](https://www.amazon.com/Microsoft-Office-SharePoint-Online-Cookbook/dp/1803243171/ref=sr_1_1?dib=eyJ2IjoiMSJ9.6sZqhuPoCclTyO38qSSU_k2h6EZ9NkNiCkemJ5Jhm8OjL1fQoT_gCHUUmxx6GpNOaC4IRNFprSu5XRrv47U6CF4oX32ShtlV-focUx5jaGavUdeObKF27ZDiJJL4UGJS.Y3NxwMGndhQyaRb2ROMkRukcu7SsCPqjKrBl-A5OjU8&dib_tag=se&keywords=Microsoft+365+and+SharePoint+Online+Cookbook&qid=1750667459&sr=8-1)

## Get to Know the Authors
**Franck Cornu** is a Microsoft 365 developer, Microsoft MVP and speaker working with Microsoft technologies for more than 10 years. He had the opportunity to work for several companies in various fields, especially around intranet and search topics, giving him a very good understanding of Microsoft technologies usages.
Blogger and author, he is also very involved in the community through the Pattern & Practices initiative. He is the original author of the PnP Modern Search solution, one of the most used SharePoint Framework open-source solutions in the world. He also created the “PnP Moden Search Core Components” solution, a solution focusing on bringing Microsoft Search based experiences inside and outside the Microsoft 365 ecosystem.

**Anoop T.** is a Microsoft MVP in the M365 Development category and currently works at Advania Ltd based in London, UK. He has worked across the entire lifecycle of projects, from gathering and analyzing requirements, to completing design and development of the projects. He has around 10 years of experience in Microsoft 365 development and has worked mainly on SharePoint Online, SharePoint 2013 and 2010. Anoop is a member of the core team of Microsoft 365 and Power Platform community formerly known as Patterns and Practices (PnP) team and is a regular contributor to the PnP projects on GitHub. He is also a speaker at conferences and user groups and writes blog articles dedicated to his experience with M365 development which can be found on Medium @anoopt.
