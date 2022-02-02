<?php
namespace Tychons\KnockOut\Block;
class Display extends \Magento\Framework\View\Element\Template
{
public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Magento\Catalog\Model\ProductRepository $productRepository,
        \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,
         \Magento\Catalog\Block\Product\ListProduct $listProductBlock,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->_productRepository = $productRepository;
        $this->_productCollectionFactory = $productCollectionFactory;
        $this->listProductBlock = $listProductBlock;
    }

public function getProductCollection()
{
    /** @var $collection \Magento\Catalog\Model\ResourceModel\Product\Collection */
   $collection = $this->_productCollectionFactory->create()->addAttributeToSelect('*')->load();
    return $collection;
}



public function getAddToCartPostParams($product)
{
    return $this->listProductBlock->getAddToCartPostParams($product);
}
/* public function getaddtocart($sku){
   /*  $product =  $this->_productRepository->get($sku);
    $productid = $product->getId();
    return $productid; */
   // return $sku;

//}
public function getaddtocarts(){
    //$skuu=$sku;
$skuu="EAAC-470W";
    $productss =  $this->_productRepository->get($skuu);
    $productidss = $productss->getId();
    return $productidss; 
 /*     return $sku; */
 
 } 
}
?>