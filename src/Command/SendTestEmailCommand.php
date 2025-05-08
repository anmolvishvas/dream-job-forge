<?php
namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

#[AsCommand(name: 'app:send-test-email')]
class SendTestEmailCommand extends Command
{
    private MailerInterface $mailer;

    public function __construct(MailerInterface $mailer)
    {
        parent::__construct();
        $this->mailer = $mailer;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $email = (new Email())
            ->from('no-reply@example.com')
            ->to('anmol23vishvas@gmail.com')
            ->subject('Test Email')
            ->text('This is a test email from Symfony Mailer.');

        $this->mailer->send($email);

        $output->writeln('✅ Test email sent.');
        return Command::SUCCESS;
    }
}
