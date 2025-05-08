<?php

namespace App\Controller\Admin;

use App\Entity\TeamMember;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;

class TeamMemberCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return TeamMember::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('name', 'Full Name'),
            TextField::new('role', 'Team Role'),
            ImageField::new('image', 'Profile Image')->setUploadDir('public/uploads/team')->setRequired(false),
            TextEditorField::new('description', 'Bio'),
        ];
    }
}