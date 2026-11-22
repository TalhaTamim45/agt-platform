Add-Type -AssemblyName System.IO.Compression.FileSystem

$extracted = "e:\websites\AGT\.tmp\pptx_extracted"
$tempZip   = "e:\websites\AGT\.tmp\presentation_built.pptx"
$dest1     = "C:\Users\Hi\Downloads\Vendor Gift & Product Presentation (2).pptx"
$dest2     = "C:\Users\Hi\Downloads\Vendor Gift & Product Presentation (All Products).pptx"
$dest3     = "e:\websites\AGT\Vendor_Gift_and_Product_Presentation_All_Products.pptx"

if (Test-Path $tempZip) {
    Remove-Item -Force $tempZip
}

Write-Host "Creating PPTX archive from $extracted..."
[System.IO.Compression.ZipFile]::CreateFromDirectory($extracted, $tempZip)

Write-Host "Copying to target files..."
Copy-Item -Force $tempZip $dest1
Copy-Item -Force $tempZip $dest2
Copy-Item -Force $tempZip $dest3

Write-Host "Done! File size in Downloads:" (Get-Item $dest1).Length "bytes"
