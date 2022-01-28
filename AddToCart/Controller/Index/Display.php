<?php
namespace Tychons\AddToCart\Controller\Index;

class Display extends \Magento\Framework\App\Action\Action
{
	protected $_pageFactory;
	public function __construct(
		\Magento\Framework\App\Action\Context $context,
		\Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,
		\Magento\Framework\View\Result\PageFactory $pageFactory)
	{
		$this->_pageFactory = $pageFactory;
		 $this->_productCollectionFactory = $productCollectionFactory;
		return parent::__construct($context);
	}

	public function execute()
	{ 
		return $this->_pageFactory->create();
	}
	public function getProductCollection()
	{
		/** @var $collection \Magento\Catalog\Model\ResourceModel\Product\Collection */
	   $collection = $this->_productCollectionFactory->create()->addAttributeToSelect('*')->load();
	   print_r($collection);echo"fddd";
		return $collection;
	}
}