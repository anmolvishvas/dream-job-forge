<?php

namespace App\Controller\Admin;

use App\Entity\Candidate;
use App\Entity\Company;
use App\Entity\Job;
use App\Entity\Stat;
use App\Entity\TeamMember;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // Count entities
        $counts = [
            'candidates' => $this->em->getRepository(Candidate::class)->count([]),
            'users' => $this->em->getRepository(User::class)->count([]), // Employers
            'jobs' => $this->em->getRepository(Job::class)->count([]),
            'companies' => $this->em->getRepository(Company::class)->count([]),
            'teamMembers' => $this->em->getRepository(TeamMember::class)->count([]),
        ];

        // Fetch stats table data from Stat entity
        $statsEntities = $this->em->getRepository(Stat::class)->findAll();

        $statsTable = [];
        foreach ($statsEntities as $stat) {
            // Convert "15,000+" to 15000
            $value = (int) filter_var($stat->getNumber(), FILTER_SANITIZE_NUMBER_INT);
            $statsTable[] = [
                'label' => $stat->getLabel(),
                'value' => $value
            ];
        }

        return $this->render('admin/index.html.twig', [
            'counts' => $counts,
            'statsTable' => $statsTable,
        ]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Dream Job Forge')
            ->disableDarkMode();
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Candidates', 'fas fa-graduation-cap', Candidate::class);
        yield MenuItem::linkToCrud('Companies', 'fas fa-building', Company::class);
        yield MenuItem::linkToCrud('Jobs', 'fas fa-briefcase', Job::class);
        yield MenuItem::linkToCrud('Statistics', 'fas fa-chart-bar', Stat::class);
        yield MenuItem::linkToCrud('Team Members', 'fas fa-users', TeamMember::class);
        yield MenuItem::linkToCrud('Users', 'fas fa-user', User::class);
    }
}
