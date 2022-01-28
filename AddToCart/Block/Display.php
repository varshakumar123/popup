<?php
namespace Tychons\AddToCart\Block;
class Display extends \Magento\Framework\View\Element\Template
{
public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,
         \Magento\Catalog\Block\Product\ListProduct $listProductBlock,
        array $data = []
    ) {
        parent::__construct($context, $data);
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
}
?>