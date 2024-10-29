[CmdletBinding()]
Param (
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl,

    [Parameter(Mandatory=$true)]
    [string]$ClientId
)

Connect-PnPOnline -Url $SiteUrl -Interactive -ClientId $ClientId

# Apply site template
Invoke-PnPSiteTemplate -Path "./template.xml"

$Pictures = @{
    "UltraBoost Running Shoes" = "ultraboost.jpg"
    "Tech Fleece Hoodie" = "techfleece.jpg"
    "Futura Tee Shirt" = "futura.jpg"
}

$ProductItems = @(
    @{
        Title = "UltraBoost Running Shoes"
        packtProductModelName = "UltraBoost Running Shoes"
        packtProductRetailPrice = 180
        packtProductReference = "UB-001"
        packtProductStockLevel = 25
        packtProductColor = "Red"
        packtProductSize = "S"
    },
    @{
        Title = "Tech Fleece Hoodie"
        packtProductModelName = "Tech Fleece Hoodie"
        packtProductRetailPrice = 100
        packtProductReference = "TF-002"
        packtProductStockLevel = 40
        packtProductColor = "Black"
        packtProductSize = "M"
    }
    @{
        Title = "Futura Tee Shirt"
        packtProductModelName = "Futura Tee Shirt"
        packtProductRetailPrice = 75
        packtProductReference = "FT-002"
        packtProductStockLevel = 23
        packtProductColor = "Blue"
        packtProductSize = "L"
    }
)

# Add products list items
$ProductItems | ForEach-Object {
    $item = Add-PnPListItem -List "Products" -Values $_
    Set-PnPImageListItemColumn -List "Products" -Identity $item -Field "packtProductItemPicture" -Path "./assets/$($Pictures[$_.Title])"
}

